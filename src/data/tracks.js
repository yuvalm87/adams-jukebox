export const tracks = [
  {
    id: 'adams-recording-2026-08-08',
    title: "Adam's Recording",
    file: 'audio/adams-recording-2026-08-08.mp3',
    emoji: '🎤',
  },
  {
    id: 'jamaican-bam-bam',
    title: 'Jamaican Bam Bam',
    file: 'audio/jamaican-bam-bam.mp3',
    emoji: '🎵',
  },
  {
    id: 'shir-hadvora',
    title: 'שיר הדבורה',
    file: 'audio/shir-hadvora.mp3',
    emoji: '🐝',
  },
  {
    id: 'shaul-hachatul',
    title: 'שאול החתול',
    file: 'audio/shaul-hachatul.mp3',
    emoji: '📖',
  },
  {
    id: 'mi-ze-ratz-maher',
    title: 'מי זה רץ מהר',
    file: 'audio/mi-ze-ratz-maher.mp3',
    emoji: '🏃',
  },
  {
    id: 'audio-2026-08-21-19-59-50',
    title: 'Recording 2',
    file: 'audio/audio-2026-08-21-19-59-50.mp3',
    emoji: '🎙️',
  },
  {
    id: 'audio-2026-08-22-08-19-03',
    title: 'Morning Audio 1',
    file: 'audio/audio-2026-08-22-08-19-03.mp3',
    emoji: '☀️',
  },
  {
    id: 'audio-2026-08-22-08-19-04',
    title: 'Morning Audio 2',
    file: 'audio/audio-2026-08-22-08-19-04.mp3',
    emoji: '🌈',
  },
];

export function getAudioUrl(file) {
  const cleanFile = file.replace(/^\/+/, '');
  const base = import.meta.env.BASE_URL.endsWith('/')
    ? import.meta.env.BASE_URL
    : `${import.meta.env.BASE_URL}/`;

  return `${base}${cleanFile}`;
}
