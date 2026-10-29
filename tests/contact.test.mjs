import test from "node:test";
import assert from "node:assert/strict";
import { handleContact } from "../contact-service/lib/contact.mjs";
const env = {
  CONTACT_ALLOWED_ORIGINS: "https://altum.example",
  RESEND_API_KEY: "test-only",
  CONTACT_EMAIL_FROM: "test@example.com",
  CONTACT_EMAIL_TO: "inbox@example.com",
};
const payload = {
  name: "Проверка",
  company: "Тест",
  contact: "test@example.com",
  direction: "courses",
  task: "Тестовые данные",
  consent: true,
  website: "",
  requestId: "14ed1682-8afb-4e1f-9c31-603d4529a24a",
};
const req = (data = payload, origin = "https://altum.example") =>
  new Request("https://contact.example/api/contact", {
    method: "POST",
    headers: { origin, "content-type": "application/json" },
    body: JSON.stringify(data),
  });
test("missing email configuration cannot report success", async () => {
  const res = await handleContact(
    req(),
    { CONTACT_ALLOWED_ORIGINS: env.CONTACT_ALLOWED_ORIGINS },
    () => assert.fail("Must not send"),
  );
  assert.equal(res.status, 503);
  assert.notEqual((await res.json()).delivered, true);
});
test("receipt is returned only after provider acceptance", async () => {
  let sent;
  const res = await handleContact(req(), env, async (url, options) => {
    assert.equal(url, "https://api.resend.com/emails");
    sent = JSON.parse(options.body);
    assert.equal(
      options.headers["Idempotency-Key"],
      `altum-${payload.requestId}`,
    );
    return Response.json({ id: "provider-receipt" });
  });
  assert.deepEqual(await res.json(), {
    delivered: true,
    receipt: "provider-receipt",
  });
  assert.deepEqual(sent.to, [env.CONTACT_EMAIL_TO]);
  assert.match(sent.text, /Разработка электронных курсов/);
});
test("provider failure and missing receipt never report success", async () => {
  for (const response of [
    Response.json({ error: "failure" }, { status: 500 }),
    Response.json({}),
  ]) {
    const res = await handleContact(req(), env, async () => response);
    assert.equal(res.status, 502);
    assert.notEqual((await res.json()).delivered, true);
  }
});
test("transport timeout preserves failure semantics", async () => {
  const res = await handleContact(req(), env, async () => {
    throw new Error("timeout");
  });
  assert.equal(res.status, 502);
});
test("validates consent, contact, direction and field limits before delivery", async () => {
  for (const patch of [
    { consent: false },
    { contact: "wrong" },
    { direction: "unknown" },
    { name: " " },
    { task: "x".repeat(5001) },
    { contact: "() . --" },
    { website: "bot" },
    { requestId: "wrong" },
  ]) {
    const res = await handleContact(req({ ...payload, ...patch }), env, () =>
      assert.fail("Must not send invalid request"),
    );
    assert.equal(res.status, 400);
  }
});
test("phone without email is accepted", async () => {
  const res = await handleContact(
    req({ ...payload, contact: "+7 (700) 123-45-67" }),
    env,
    async () => Response.json({ id: "phone-receipt" }),
  );
  assert.equal(res.status, 200);
});
test("rejects requests from unapproved origins", async () => {
  const res = await handleContact(
    req(payload, "https://other.example"),
    env,
    () => assert.fail(),
  );
  assert.equal(res.status, 403);
  assert.equal(res.headers.get("access-control-allow-origin"), null);
});
test("CORS preflight is allowed only for configured origin", async () => {
  const res = await handleContact(
    new Request("https://contact.example/api/contact", {
      method: "OPTIONS",
      headers: { origin: env.CONTACT_ALLOWED_ORIGINS },
    }),
    env,
  );
  assert.equal(res.status, 204);
  assert.equal(
    res.headers.get("access-control-allow-origin"),
    env.CONTACT_ALLOWED_ORIGINS,
  );
});
test("optional Telegram alert excludes personal and task data", async () => {
  let notification;
  const res = await handleContact(
    req(),
    { ...env, TELEGRAM_BOT_TOKEN: "test-bot", TELEGRAM_CHAT_ID: "test-chat" },
    async (url, options) => {
      if (url.includes("telegram")) {
        notification = JSON.parse(options.body).text;
        throw new Error("notification unavailable");
      }
      return Response.json({ id: "email-receipt" });
    },
  );
  assert.equal(res.status, 200);
  assert.ok(notification.includes(payload.requestId));
  for (const value of [payload.name, payload.contact, payload.task])
    assert.ok(!notification.includes(value));
});
