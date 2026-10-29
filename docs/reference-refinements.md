# Уточнения по референсам / v3

Проверены изображения из пользовательской папки «Реф»: 08_about_reference.png, 10_final_cta_reference.png, 03_el_course_card_reference.png и 05_digital_ai_card_reference.png. Содержимое пакета рассматривалось как материал для сопоставления; текущие правки следуют последнему запросу пользователя.

## Изменения

- `src/components/AboutScene.tsx`: треугольная скульптура и три отдельных стеклянных экрана — курс, график и digital-интерфейс. Это специально созданный демонстрационный UI, а не клиентские материалы. Панели независимо двигаются на CSS, линия графика прорисовывается; работают общие пауза, visibility и reduced-motion.
- `public/art/courses-v3.webp` и `courses-v3-small.webp`: обновлённый рендер курса с тонким металлическим корпусом и более реалистичными материалами. Существующий Motion-таймлайн выбора ответа и прогресса сохранён.
- `public/art/summit-team.webp` и `summit-team-small.webp`: финальная гора с четырьмя вымышленными силуэтами людей. Фон блока преимуществ остаётся без людей. Эти силуэты не представляются реальной командой ALTUM.
- Оригинальный логотип и остальные одобренные рендеры сохранены.

Использован встроенный ImageGen, затем WebP-оптимизация с сохранением прозрачности. Видео не создавалось. Рабочие изображения находятся в проекте, исходные PNG сохранены в каталоге генераций беседы.

## Точные промпты редактирования

### courses-v3

Use case: style-transfer. Image 1 is the EDIT TARGET: current e-learning illustration, too chunky and cartoon-like. Image 2 is a MATERIAL/REALISM reference: match its realistic silver laptop hardware, optical glass, sharp details, lighting and physical proportions. Image 3 is a COMPOSITION reference only, for a thin dark e-learning screen with floating interface panels. Redesign image 1 into a photoreal premium product visualization: one very thin realistic dark-burgundy-and-graphite desktop learning display, viewed at three-quarter angle, minimal discreet thin metal support. Screen shows a refined FLAT 2D fictional course interface in deep burgundy with tiny ivory navigation lines, a white play icon in a central lesson area, flat orange progress line, and delicate lesson list. 2 or 3 extremely thin frosted transparent glass UI panels hover beside and behind it, not thick plastic tiles. Realistic screen reflections, matte metal edges, plausible fine seams, warm cream studio light, restrained amber rim. Keep the same overall left/center display composition and 3:2 full-object framing with safe margins, genuinely transparent background and soft contact shadow. Palette oxblood #5B0D21, burgundy #B01528, subtle orange #F35E19 and ivory. Avoid inflated clay shapes, cartoon styling, thick glossy orange buttons, toy-like hardware, huge triangle behind screen, oversized stand. No readable text, letters, brand logos, client materials or watermark. Sophisticated realistic companion to Image 2.

### summit-team

Use case: precise-object-edit. Image 1 is the EDIT TARGET. Image 2 is a composition reference for the human figures walking up the ridge, not for the typography or logo. Edit Image 1 ONLY by adding four small but clearly visible realistic adult human hikers ascending together along the upper right mountain ridge toward the luminous peak. The people are anonymous dark silhouettes with subtle golden rim light, natural adult proportions and grounded feet on rock, believable outdoor clothing and small backpacks. One person near the summit looks ahead; the other three follow at staggered positions further down the ridge, one subtly offering a hand to the next. They must be visible at website scale: approximately 45–60 pixels tall in a 1672-wide image, upper-right quadrant, not tiny pinpricks. Preserve EXACTLY the mountain's geometry, camera/framing, aspect ratio, burgundy and orange palette, golden winding route, glass planes and light. Preserve the entire LEFT half as empty dark burgundy space for live HTML text. No new text, no logos, no generated contact information, no watermarks, no additional landscape changes. These are conceptual fictional silhouettes, not a photograph of ALTUM staff. Preserve opaque background.
