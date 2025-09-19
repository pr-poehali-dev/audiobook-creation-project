import { useState, useRef } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Slider } from '@/components/ui/slider';
import Icon from '@/components/ui/icon';

interface Chapter {
  id: number;
  title: string;
  duration: string;
  audioUrl: string;
}

interface Audiobook {
  id: number;
  title: string;
  author: string;
  narrator: string;
  cover: string;
  duration: string;
  rating: number;
  description: string;
  chapters: Chapter[];
}

const Index = () => {
  const [selectedBook, setSelectedBook] = useState<Audiobook | null>(null);
  const [currentChapter, setCurrentChapter] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState([75]);
  const audioRef = useRef<HTMLAudioElement>(null);

  const audiobooks: Audiobook[] = [
    {
      id: 1,
      title: "Война и мир",
      author: "Лев Толстой",
      narrator: "Игорь Ильинский",
      cover: "/img/352b295e-9b83-4a6d-b3a9-4e396c916895.jpg",
      duration: "24 ч 15 мин",
      rating: 4.8,
      description: "Величайший роман русской литературы о жизни русского общества в эпоху наполеоновских войн.",
      chapters: [
        { id: 1, title: "Глава 1. Салон Анны Павловны", duration: "45:30", audioUrl: "" },
        { id: 2, title: "Глава 2. Семья Ростовых", duration: "52:15", audioUrl: "" },
        { id: 3, title: "Глава 3. Князь Андрей", duration: "38:45", audioUrl: "" },
        { id: 4, title: "Глава 4. Наташа Ростова", duration: "41:20", audioUrl: "" },
        { id: 5, title: "Глава 5. Бородинское сражение", duration: "56:10", audioUrl: "" }
      ]
    },
    {
      id: 2,
      title: "Преступление и наказание",
      author: "Федор Достоевский",
      narrator: "Константин Хабенский",
      cover: "/img/92216513-33e6-427a-b073-41f73d6953b8.jpg",
      duration: "18 ч 30 мин",
      rating: 4.9,
      description: "Психологический роман о студенте Раскольникове и его внутренней борьбе.",
      chapters: [
        { id: 1, title: "Часть 1. Преступление", duration: "1:15:20", audioUrl: "" },
        { id: 2, title: "Часть 2. Следствие", duration: "1:08:45", audioUrl: "" },
        { id: 3, title: "Часть 3. Раскаяние", duration: "1:22:30", audioUrl: "" }
      ]
    }
  ];

  const handlePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleChapterSelect = (chapterIndex: number) => {
    setCurrentChapter(chapterIndex);
    setProgress(0);
  };

  const handlePrevious = () => {
    if (currentChapter > 0) {
      setCurrentChapter(currentChapter - 1);
      setProgress(0);
    }
  };

  const handleNext = () => {
    if (selectedBook && currentChapter < selectedBook.chapters.length - 1) {
      setCurrentChapter(currentChapter + 1);
      setProgress(0);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-library-light via-library-cream to-library-light">
      {/* Header */}
      <header className="bg-library-dark/95 backdrop-blur-sm border-b border-library-warm/20 sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Icon name="BookOpen" size={28} className="text-library-accent" />
              <h1 className="text-2xl font-bold text-library-cream">Библиотека Аудиокниг</h1>
            </div>
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#" className="text-library-cream/80 hover:text-library-accent transition-colors duration-200 font-medium">Главная</a>
              <a href="#" className="text-library-cream/80 hover:text-library-accent transition-colors duration-200 font-medium">Каталог</a>
              <a href="#" className="text-library-cream/80 hover:text-library-accent transition-colors duration-200 font-medium">Моя библиотека</a>
              <a href="#" className="text-library-cream/80 hover:text-library-accent transition-colors duration-200 font-medium">О нас</a>
            </nav>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        {!selectedBook ? (
          <div>
            {/* Hero Section */}
            <section className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold text-library-dark mb-4">
                Откройте Мир Аудиокниг
              </h2>
              <p className="text-xl text-library-dark/70 max-w-2xl mx-auto mb-8">
                Слушайте любимые произведения в любое время, в любом месте. 
                Классическая литература в современном формате.
              </p>
              <div className="flex justify-center">
                <img 
                  src="/img/e7f1f595-90e0-4212-968a-3f95d60f099a.jpg" 
                  alt="Библиотека" 
                  className="rounded-2xl shadow-2xl max-w-2xl w-full h-64 object-cover"
                />
              </div>
            </section>

            {/* Books Grid */}
            <section>
              <h3 className="text-3xl font-bold text-library-dark mb-8 text-center">Наша Коллекция</h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {audiobooks.map((book) => (
                  <Card 
                    key={book.id} 
                    className="group hover:shadow-2xl transition-all duration-300 cursor-pointer border-library-warm/30 bg-white/80 backdrop-blur-sm hover:scale-105"
                    onClick={() => setSelectedBook(book)}
                  >
                    <CardHeader className="p-0">
                      <div className="relative overflow-hidden rounded-t-lg">
                        <img 
                          src={book.cover} 
                          alt={book.title}
                          className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-library-dark/60 via-transparent to-transparent" />
                        <div className="absolute bottom-4 left-4 text-white">
                          <div className="flex items-center space-x-2 mb-2">
                            <Icon name="Star" size={16} className="text-yellow-400 fill-current" />
                            <span className="text-sm font-medium">{book.rating}</span>
                          </div>
                          <div className="flex items-center space-x-2 text-sm opacity-90">
                            <Icon name="Clock" size={14} />
                            <span>{book.duration}</span>
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="p-6">
                      <h4 className="text-xl font-bold text-library-dark mb-2 group-hover:text-library-warm transition-colors">
                        {book.title}
                      </h4>
                      <p className="text-library-dark/70 mb-2 font-medium">{book.author}</p>
                      <p className="text-sm text-library-dark/60 mb-4">Читает: {book.narrator}</p>
                      <p className="text-sm text-library-dark/80 line-clamp-3">{book.description}</p>
                      <Button 
                        className="w-full mt-4 bg-library-warm hover:bg-library-dark text-white font-medium py-2 transition-colors duration-200"
                      >
                        <Icon name="Play" size={16} className="mr-2" />
                        Слушать
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Book Details */}
            <div className="lg:col-span-1">
              <Card className="sticky top-24 border-library-warm/30 bg-white/90 backdrop-blur-sm">
                <CardContent className="p-6">
                  <Button 
                    variant="ghost" 
                    onClick={() => setSelectedBook(null)}
                    className="mb-4 p-2 text-library-dark hover:text-library-warm"
                  >
                    <Icon name="ArrowLeft" size={20} className="mr-2" />
                    Назад к каталогу
                  </Button>
                  <img 
                    src={selectedBook.cover} 
                    alt={selectedBook.title}
                    className="w-full rounded-lg shadow-lg mb-6"
                  />
                  <h3 className="text-2xl font-bold text-library-dark mb-2">{selectedBook.title}</h3>
                  <p className="text-library-dark/70 font-medium mb-1">{selectedBook.author}</p>
                  <p className="text-sm text-library-dark/60 mb-4">Читает: {selectedBook.narrator}</p>
                  
                  <div className="flex items-center space-x-4 mb-4 text-sm text-library-dark/70">
                    <div className="flex items-center space-x-1">
                      <Icon name="Star" size={16} className="text-yellow-400 fill-current" />
                      <span>{selectedBook.rating}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Icon name="Clock" size={16} />
                      <span>{selectedBook.duration}</span>
                    </div>
                  </div>
                  
                  <p className="text-sm text-library-dark/80">{selectedBook.description}</p>
                </CardContent>
              </Card>
            </div>

            {/* Player and Chapters */}
            <div className="lg:col-span-2 space-y-6">
              {/* Audio Player */}
              <Card className="border-library-warm/30 bg-white/90 backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className="text-center mb-6">
                    <h4 className="text-lg font-semibold text-library-dark mb-1">
                      {selectedBook.chapters[currentChapter]?.title}
                    </h4>
                    <p className="text-sm text-library-dark/60">
                      Глава {currentChapter + 1} из {selectedBook.chapters.length}
                    </p>
                  </div>

                  {/* Progress Bar */}
                  <div className="mb-6">
                    <Progress value={progress} className="h-2 mb-2" />
                    <div className="flex justify-between text-xs text-library-dark/60">
                      <span>0:00</span>
                      <span>{selectedBook.chapters[currentChapter]?.duration}</span>
                    </div>
                  </div>

                  {/* Controls */}
                  <div className="flex items-center justify-center space-x-4 mb-6">
                    <Button 
                      variant="ghost" 
                      size="icon"
                      onClick={handlePrevious}
                      disabled={currentChapter === 0}
                      className="text-library-dark hover:text-library-warm disabled:opacity-50"
                    >
                      <Icon name="SkipBack" size={20} />
                    </Button>
                    
                    <Button 
                      size="icon"
                      onClick={handlePlayPause}
                      className="bg-library-warm hover:bg-library-dark text-white w-12 h-12"
                    >
                      <Icon name={isPlaying ? "Pause" : "Play"} size={24} />
                    </Button>
                    
                    <Button 
                      variant="ghost" 
                      size="icon"
                      onClick={handleNext}
                      disabled={currentChapter === selectedBook.chapters.length - 1}
                      className="text-library-dark hover:text-library-warm disabled:opacity-50"
                    >
                      <Icon name="SkipForward" size={20} />
                    </Button>
                  </div>

                  {/* Volume Control */}
                  <div className="flex items-center space-x-3">
                    <Icon name="Volume2" size={18} className="text-library-dark/60" />
                    <Slider
                      value={volume}
                      onValueChange={setVolume}
                      max={100}
                      step={1}
                      className="flex-1"
                    />
                    <span className="text-sm text-library-dark/60 w-10">{volume[0]}%</span>
                  </div>

                  <audio ref={audioRef} className="hidden" />
                </CardContent>
              </Card>

              {/* Chapters List */}
              <Card className="border-library-warm/30 bg-white/90 backdrop-blur-sm">
                <CardHeader>
                  <h4 className="text-xl font-semibold text-library-dark flex items-center">
                    <Icon name="List" size={20} className="mr-2" />
                    Главы
                  </h4>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="max-h-96 overflow-y-auto">
                    {selectedBook.chapters.map((chapter, index) => (
                      <div 
                        key={chapter.id}
                        onClick={() => handleChapterSelect(index)}
                        className={`flex items-center justify-between p-4 cursor-pointer border-b border-library-warm/20 last:border-b-0 transition-colors duration-200 ${
                          index === currentChapter 
                            ? 'bg-library-warm/10 text-library-warm' 
                            : 'hover:bg-library-cream/50 text-library-dark'
                        }`}
                      >
                        <div className="flex items-center space-x-3">
                          <span className="w-6 h-6 rounded-full bg-library-warm/20 flex items-center justify-center text-xs font-medium">
                            {index + 1}
                          </span>
                          <span className="font-medium">{chapter.title}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-sm opacity-70">
                          <Icon name="Clock" size={14} />
                          <span>{chapter.duration}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;