export function Hero() {
  return (
    <section className="min-h-screen hero-gradient flex items-center justify-center relative overflow-hidden pt-20">
      <div className="container mx-auto px-4 text-center z-10">
        <div className="fade-in-up">
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-dancing font-bold gradient-text mb-8">
            Happy Birthday
          </h1>
          <h2 className="text-4xl md:text-6xl font-dancing text-primary mb-12">
            Syntica! 🎉
          </h2>
        </div>

        <div className="flex justify-center mb-12 scale-in" style={{ animationDelay: '0.3s' }}>
          <div className="grid grid-cols-2 gap-4 max-w-lg">
            <div className="polaroid">
              <img 
                src="https://drive.google.com/thumbnail?id=132dQcuw_0gzdAHwpW4WZblZ9B4RjInPQ&sz=w400"
                alt="Birthday memories 1" 
                className="w-32 h-32 md:w-40 md:h-40 object-cover rounded-lg"
                onError={(e) => {
                  e.currentTarget.src = "/images/hero.jpg";
                }}
              />
            </div>
            <div className="polaroid">
              <img 
                src="https://drive.google.com/thumbnail?id=1oX9cjXB25Anf2F99ir1tXvKFrX6w0hRu&sz=w400"
                alt="Birthday memories 2" 
                className="w-32 h-32 md:w-40 md:h-40 object-cover rounded-lg"
                onError={(e) => {
                  e.currentTarget.src = "/images/hero.jpg";
                }}
              />
            </div>
            <div className="polaroid">
              <img 
                src="https://drive.google.com/thumbnail?id=1Pmn7VSyE2oi8cDgPbGzeIk8JUstJDawK&sz=w400"
                alt="Birthday memories 3" 
                className="w-32 h-32 md:w-40 md:h-40 object-cover rounded-lg"
                onError={(e) => {
                  e.currentTarget.src = "/images/hero.jpg";
                }}
              />
            </div>
            <div className="polaroid">
              <img 
                src="https://drive.google.com/thumbnail?id=1JcANsnjm0sd2ehbGHoSoPaY5CohPaCbY&sz=w400"
                alt="Birthday memories 4" 
                className="w-32 h-32 md:w-40 md:h-40 object-cover rounded-lg"
                onError={(e) => {
                  e.currentTarget.src = "/images/hero.jpg";
                }}
              />
            </div>
          </div>
          <div className="text-center mt-4 font-dancing text-xl text-gray-700">
            Another year of awesome! ✨
          </div>
        </div>

        <div className="fade-in-up" style={{ animationDelay: '0.6s' }}>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Happy Birthday, Syntica!
            To the most beautiful and gorgeous girl in the universe—
            now you're one year older than me, Y-Y
            but you'll always be my big sis!!! 💖<br/><br/>
            We all love you sooo much.
            Happy birthday, queen! 👑✨
          </p>
        </div>
      </div>
    </section>
  )
}