/**
 * ⭐ FEATURES SECTION - Prezintă 3 avantaje/caracteristici principale
 *
 * Pentru cursanți:
 * - Folosim Array.map() pentru a genera carduri dintr-o listă de date
 * - Acest pattern (date + map) este ESENȚIAL în React
 * - features = array cu obiecte (fiecare obiect = un card)
 */

export default function Features() {
  /**
   * 📊 DATE PENTRU CARDURI
   * - icon = emoji (poți folosi și SVG icons)
   * - title = titlu scurt
   * - description = text explicativ
   */
  const features = [
    {
      icon: '☕',
      title: 'Cafea de Specialitate',
      description:
        'Boabe proaspăt prăjite din plantații selectate, pentru aroma perfectă în fiecare ceașcă',
      image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&auto=format&fit=crop',
    },
    {
      icon: '🥐',
      title: 'Patiserie Artizanală',
      description:
        'Deserturi și produse de patiserie pregătite zilnic cu ingrediente premium',
      image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800&auto=format&fit=crop',
    },
    {
      icon: '🪴',
      title: 'Ambient Relaxant',
      description:
        'Spațiu modern și primitor, perfect pentru lucru, studiu sau întâlniri',
      image: 'https://images.unsplash.com/photo-1445116572660-236099ec97a0?w=800&auto=format&fit=crop',
    },
  ];

  return (
    <section className="py-20 px-6">
      {/*
        📦 CONTAINER
        - max-w-7xl = lățime maximă 80rem (1280px)
        - mx-auto = centrat orizontal
      */}
      <div className="max-w-7xl mx-auto">
        {/*
          📝 TITLU SECȚIUNE
          - text-center = text centrat
          - mb-16 = margin-bottom 64px (spațiu până la carduri)
        */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            De ce <span className="text-primary">Vibe Coffee</span>?
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Experiență unică, ingrediente premium, atmosferă perfectă
          </p>
        </div>

        {/*
          🎴 GRID CARDURI
          - grid = CSS Grid Layout
          - grid-cols-1 = 1 coloană pe mobile
          - md:grid-cols-3 = 3 coloane pe desktop (768px+)
          - gap-8 = spațiu între carduri (32px)
        */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/*
            🔄 MAP PRIN ARRAY
            - features.map() = pentru fiecare element din array, creează un card
            - feature = obiectul curent din iterație
            - index = poziția în array (0, 1, 2)
            - key={index} = React are nevoie de "key" unic pentru fiecare element în listă
          */}
          {features.map((feature, index) => (
            <div
              key={index}
              className="glass glass-hover rounded-2xl overflow-hidden"
            >
              {/*
                🖼️ IMAGINE FEATURE
                - relative h-56 = înălțime fixă 224px
                - overflow-hidden = cropează imaginea la colțuri rotunjite
              */}
              <div className="relative h-56 overflow-hidden">
                <img
                  src={feature.image}
                  alt={feature.title}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                />
                {/*
                  🎨 ICON OVERLAY
                  - Plutește deasupra imaginii
                  - Fundal semi-transparent pentru lizibilitate
                */}
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm w-16 h-16 rounded-full flex items-center justify-center text-4xl shadow-lg">
                  {feature.icon}
                </div>
              </div>

              {/*
                📝 TEXT CONTENT
              */}
              <div className="p-6 text-center">
                {/*
                  📌 TITLU CARD
                  - text-2xl = 24px
                  - font-semibold = greutate 600
                  - mb-3 = spațiu sub titlu
                */}
                <h3 className="text-2xl font-semibold text-foreground mb-3">
                  {feature.title}
                </h3>

                {/*
                  📄 DESCRIERE
                  - text-gray-600 = gri mediu (contrast bun pe fundal alb)
                  - leading-relaxed = line-height mai mare pentru lizibilitate
                */}
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
