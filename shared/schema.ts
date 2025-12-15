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
    name: "Kişi 1",
    photo: "/photos/kisi1.jpg",
    message: "Buraya kişi 1'in uzun mesajı gelecek. İyi ki varsın, iyi ki hayatımızdasın. Seni seviyorum.",
    audioSrc: "/audio/kisi1.mp3",
  },
  {
    id: 2,
    name: "Kişi 2",
    photo: "/photos/kisi2.jpg",
    message: "Buraya kişi 2'nin mesajı gelecek. Harika bir insansın.",
    audioSrc: "/audio/kisi2.mp3",
  },
  {
    id: 3,
    name: "Kişi 3",
    photo: "/photos/kisi3.jpg",
    message: "Buraya kişi 3'ün mesajı gelecek. Seni çok seviyorum.",
    audioSrc: "/audio/kisi3.mp3",
  },
  {
    id: 4,
    name: "Kişi 4",
    photo: "/photos/kisi4.jpg",
    message: "Buraya kişi 4'ün mesajı gelecek. İyi ki doğdun!",
    audioSrc: "/audio/kisi4.mp3",
  },
  {
    id: 5,
    name: "Kişi 5",
    photo: "/photos/kisi5.jpg",
    message: "Buraya kişi 5'in mesajı gelecek. Mutlu yıllar!",
    audioSrc: "/audio/kisi5.mp3",
  },
  {
    id: 6,
    name: "Sen",
    photo: "/photos/kisi6.jpg",
    message: "Ve en özel kişi: Sen. İyi ki varsın, iyi ki doğdun. Seni çok ama çok seviyorum!",
    audioSrc: "/audio/sen.mp3",
    isSpecial: true,
  },
];
