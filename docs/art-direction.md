# ALTUM — visual production / v2

Все новые изображения созданы встроенным ImageGen. Это растровые CGI-иллюстрации; они не являются видео или интерактивными 3D-моделями. Motion for React отдельно анимирует интерфейсные слои, камеру-композицию и изолированного коня. Оригинальный логотип ALTUM не генерировался и не изменялся.

## Финальные изображения

- `public/art/hero.webp` — стеклянная скульптура первого экрана и секции о компании.
- `public/art/courses.webp` — электронный курс, поверх него живой вопрос, курсор и прогресс.
- `public/art/training.webp` — цельный статичный постер бизнес-игры.
- `public/art/training-base.webp` — отдельная сцена без коня.
- `public/art/knight.webp` — отдельный конь, который движется на Motion-таймлайне.
- `public/art/digital.webp` — digital-композиция с живым графиком и AI-панелью.
- `public/art/summit.webp` — пейзаж контрастных секций.
- `*-small.webp` — оптимизированные версии для небольших экранов.

Изображения оптимизированы в WebP с сохранением прозрачности. Исходные PNG сохранены инструментом в каталоге генераций этой беседы, а все используемые сайтом файлы скопированы в проект. Нет клиентских материалов, названий клиентов и фиктивных результатов.

## Prompt set

### Hero

Use case: stylized-concept. Asset type: premium website hero 3D sculpture, transparent cutout. Create a breathtaking sophisticated photoreal CGI sculptural composition, angular triangular architectural forms rising to a tall peak. Main object is a three-dimensional open triangular sculpture made of folded deep oxblood ruby translucent glass and amber orange optical glass with golden inner facets. It suggests a triangular ascent, NOT a logo, no brand lettering. Rich physical refraction, beveled edges, dark ruby inner shadows, jewel-like orange core, architectural elegance. Thin delicate golden elliptical light trails sweep around sculpture, 3 tiny floating faceted shards and 2 small amber glass spheres. Low three-quarter camera, sculpture fills frame, complete object visible with generous safe border, natural soft contact shadow beneath. Luxury contemporary digital agency aesthetic, Cinema4D/Octane quality, precise realistic materials and soft studio lighting with warm orange rim, restrained glow. Isolated on genuinely transparent background, no floor rectangle, no text, no interface cards, no letters, no logos, no watermark. Burgundy #B01528, orange #F35E19, gold #FCCB06. Landscape 3:2 framing.

### Courses

Use case: stylized-concept. Asset type: premium digital agency service illustration on transparent background. Photoreal 3D composition of a beautiful slim dark burgundy desktop digital learning screen at a three-quarter angle with a minimal abstract course interface of cream panels, tiny burgundy navigation and orange chart placeholders. Several separate floating frosted glass UI cards at varying depths around it, blank rounded fields and orange little square tiles, tiny yellow play triangle shape. Sophisticated isometric perspective with realistic beveled materials, orange edge lights, ruby glass translucent triangular fragment behind the screen, soft contact shadows, warm cinematic studio rendering, Cinema4D/Octane luxury product visualization. High detail, balanced composition, all object edges completely within frame. No text, no letters, no numbers, no logo, no watermark. Color scheme warm ivory #FBF8F5, oxblood #5B0D21, orange #F35E19 and golden yellow #FCCB06. Isolated cutout with truly transparent background and soft contact shadow, landscape 3:2.

### Training

Use case: stylized-concept. Asset type: sophisticated business strategy 3D illustration for a premium consulting website, transparent cutout. Create a beautifully art-directed photoreal luxury still life: a tall glossy nearly black burgundy chess knight and an amber translucent glass king on low warm ivory and burgundy architectural cubes. Accurate elegant recognizable adult chess pieces, dramatic refined proportions. Behind them a tall translucent red-orange triangular optical glass prism, a small translucent amber die with pips, 2 thin frosted-glass strategy panels with tiny abstract gold line charts with NO text. Subtle glowing gold line connects bases, a few hovering geometric game elements. Composition feels like a luxury board game meets modern architectural sculpture, not a children's game. High-end Cinema4D/Octane photoreal render, ruby refractions, caustics, warm orange side lighting, detailed glossy ceramic and glass materials, complete composition visible with margins. Transparent background; no solid backdrop, no text, no lettering, no logo, no watermark. Colors oxblood #5B0D21, deep wine #7F1631, luminous orange #F35E19, golden yellow #FCCB06, ivory. Landscape 3:2.

### Digital

Use case: stylized-concept. Asset type: premium CGI digital product illustration for modern creative agency website, transparent cutout. Elegant realistic silver slim open laptop viewed at three-quarter angle from slightly above, displaying an ultra-clean contemporary website dashboard in cream, burgundy and subtle orange. Floating glass panels around laptop with abstract rising orange graphs, rounded content tiles, a small network of glowing golden nodes linked with fine lines and two ruby-orange translucent cubes. Detailed laptop keyboard and realistic screen reflections, deep burgundy bezel, orange screen accents. A small glossy white chess pawn beside laptop references strategic thinking. Premium international digital studio aesthetic, photoreal Cinema4D/Octane render, warm ivory and orange rim light, sophisticated subtle shadows and depth of field, complete composition visible with margins. Isolated on genuinely transparent background with soft contact shadow, no floor rectangle. No words, no letters, no numbers, no logos, no watermark. Colors warm ivory, burgundy #5B0D21, orange #F35E19, gold #FCCB06. Landscape 3:2.

### Summit

Use case: stylized-concept. Asset type: cinematic wide website background for ALTUM Consulting, full bleed 16:9 landscape. A dramatic sculptural mountain ridge made of deep burgundy obsidian and ruby glass facets, rising from lower left to a striking triangular summit on the RIGHT third. Fine luminous molten golden-orange path winds up the mountain to the peak, brilliant restrained sunlight at summit, transparent large amber polygonal planes extend from the peak into dark space. Cinematic premium international agency campaign art, photoreal CGI Octane render, beautifully detailed rough rock combined with optical glass, fine atmospheric haze and warm orange light, high contrast rich dark shadows, NOT a flat vector illustration. LEFT HALF mostly very dark smooth burgundy #260713 negative space suitable for white text. Overall colors deep oxblood #5B0D21, graphite, orange #F35E19, gold #FCCB06. No people, no text, no logo, no watermark, no typography. Elegant epic forward motion, refined restrained light trails. Full background opaque.

### Training background plate — edit of Training

Edit target: attached transparent CGI business strategy composition. Remove ONLY the dark burgundy chess knight on the left center. Leave its ruby pedestal empty, with its normal shiny top surface. Preserve EXACTLY the other objects, their positions, the amber king, dice, glass triangular prism, panels, pedestals, lighting, materials, composition, framing, dimensions and existing transparent background. No new objects. No lettering. This is an animation background plate; the knight will be animated separately.

### Knight cutout — edit of Training

Edit target: attached transparent CGI business strategy composition. Extract ONLY the exact dark burgundy chess knight at left center, as a clean transparent isolated cutout. Preserve its original camera angle, ruby glass/ceramic material, warm golden edge lighting, and exact shape. Remove EVERY other object, all pedestals, all floor, all king, all dice, all panels, all lines, all glow, and all background. Show complete knight including its round base, tightly centered in a portrait 2:3 frame with modest clear margins, on genuinely transparent background. No text, no logo. This knight asset will be placed back on its original scene and animated.
