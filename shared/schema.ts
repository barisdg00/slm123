import { z } from "zod";

// Kişi veri modeli
export const personSchema = z.object({
  id: z.number(),
  name: z.string(),
  photo: z.string(),
  message: z.string(),
  audioSrc: z.string().optional(),
  isSpecial: z.boolean().optional(),
});

export type Person = z.infer<typeof personSchema>;

// Sayfa durumu
export const pageStateSchema = z.object({
  currentPage: z.number(),
  totalPages: z.number(),
  isLoading: z.boolean(),
  audioUnlocked: z.boolean(),
});

export type PageState = z.infer<typeof pageStateSchema>;

// Varsayılan kişiler (placeholder - kullanıcı kendi fotoğraflarını ekleyecek)
export const defaultPersons: Person[] = [
  {
    id: 1,
    name: "ZARİFE",
    photo: "/photos/kisi1.jpg",
    message: "Güzel anılarımda yeri olan, kötü hatıralarımı bile güzelleştiren tatlı bıcırığım… Hayatıma kattığın neşe için sana çoooook teşekkür ederim. İyi ki varsın dediğim nadir insanlardansın. Umarım hep gözünde değer verdiğin bir dost olarak kalırım. O küçük kızın gözlerindeki ışık hiç sönmesin. İyi ki tanışmışız, seni çok seviyorum. Doğum günün sana dilediğin her şeyi getirsin ♡",
    audioSrc: "/audio/kisi1.mp3",
  },
  {
    id: 2,
    name: "ELİF",
    photo: "/photos/kisi2.jpg",
    message: "Elifikoçikom doğum günün kutlu olsun. Seni çok seviyorum. Kafanı ısırırım. Fav toxic ilişkimin parçasısın. Elimizde büyüdün elimizde. Nice kavga ediceğimiz yıllara.",
    audioSrc: "/audio/kisi2.mp3",
  },
  {
    id: 3,
    name: "ASLI",
    photo: "/photos/kisi3.jpg",
    message: `İyi ki doğdun bıcırığımm 🎂
    Geçen sene yurtta tanıştık ama sanki hep vardın. Çok şey öğrendim sizden akıllı, güzel kızım benim.
    Tatlılığın zaten olay, biraz kafadan kırık olman da seni sen yapan en güzel detay 😉
    Gülüşün hep yüzünde olsun, hayallerin tek tek gerçekleşsin.
    İyi ki varsın, iyi ki tanımışım seni 🧡`,

    audioSrc: "/audio/kisi3.mp3",
  },
  {
    id: 4,
    name: "OĞUZHAN",
    photo: "/photos/kisi4.jpg",
    message: "Doğum günün kutlu olsun mor dudaklı Telif\nYaş büyüdü (şüpheli), şeytanlık büyüdü (kesinlikle) sonumuz hayır olsun",
    audioSrc: "/audio/kisi4.mp3",
  },
  {
    id: 5,
    name: "ASU",
    photo: "/photos/kisi5.jpg",
    message: "Elifffciiim iyi ki doğdun iyi ki varsın  seninle yeni tanıştık ama iyi ki tanışmışız umarım her şey dilediğince ,istediğin gibi olur hayat senin karşına hep senin gibi güzellikler çıkarsın seni seviyoruum♥",
    audioSrc: "/audio/kisi5.mp3",
  },
  {
    id: 6,
    name: "BARIŞIN",
    photo: "/photos/kisi6.jpg",
    message: "Ve en özel kişi: Sen. İyi ki varsın, iyi ki doğdun. Seni çok ama çok seviyorum!",
    audioSrc: "/audio/sen.mp3",
    isSpecial: true,
  },
];
