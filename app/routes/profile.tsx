import BgImage from "~/assets/images/kegiatan.jpg";
import ProfileImg from "~/assets/images/profile.jpg";
import ConnectWithMe from "~/components/shared/connect-with-me";
import { cn } from "~/lib/utils";
import type { Route } from "./+types/profile";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Profil - Noor Ishmatuddin, S.I.P." },
    {
      name: "description",
      content:
        "Kumpulan dokumentasi kegiatan dan program kerja Noor Ishmatuddin, S.I.P., Wakil Ketua DPRD Banyuasin, dalam menjalankan tugas dan aspirasi masyarakat Banyuasin.",
    },
  ];
}

export default function Profile() {
  return (
    <>
      <section
        className="relative h-40 bg-cover bg-position-[50%_25%] px-5 md:h-60 lg:h-90"
        style={{
          backgroundImage: `url(${BgImage})`,
        }}
      >
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative mx-auto flex h-full max-w-7xl items-center">
          <h1 className="text-4xl font-bold text-white">PROFIL</h1>
        </div>
      </section>
      <section className="bg-white py-7">
        <div className="mx-auto flex max-w-7xl flex-col gap-7">
          <div className="space-y-3 px-2 text-sm text-pretty md:text-base">
            <p>
              Noor Ishmatuddin, S.I.P. (lahir di Betung, Kabupaten Banyuasin, 22
              April 1997) adalah seorang politisi muda Indonesia yang berasal
              dari Provinsi Sumatera Selatan. Ia dikenal sebagai sosok generasi
              muda yang visioner, dekat dengan masyarakat, dan berkomitmen kuat
              terhadap pembangunan daerah berbasis nilai, integritas, dan
              keberpihakan pada rakyat kecil.
            </p>
            <p>
              Saat ini, ia menjabat sebagai Anggota DPRD Kabupaten Banyuasin
              periode 2024–2029 di Komisi I yang membidangi pemerintahan, hukum,
              dan keamanan. Sebelumnya, pada periode 2019–2024, ia dipercaya
              menjabat sebagai Wakil Ketua DPRD Kabupaten Banyuasin dari Fraksi
              Partai Gerindra pada usia 22 tahun, menjadikannya salah satu
              pimpinan DPRD termuda di Indonesia.
            </p>
          </div>
        </div>
      </section>
      <section className="bg-white py-7">
        <div className="flex max-w-7xl mx-auto flex-col gap-4 md:flex-row md:gap-10">
          <div className="flex-1">
            <div className="relative aspect-square max-h-72 w-full overflow-hidden md:sticky md:top-28 md:m-auto md:max-h-max md:w-full md:max-w-120">
              <img
                src={ProfileImg}
                alt="profile"
                className="absolute h-full w-full object-cover object-[50%_15%] shadow-md"
              />
            </div>
          </div>
          <div className="flex-1 px-3">
            <h2
              className={cn(
                "relative font-bold text-[#840000] text-xl mb-6",
                'after:absolute after:-bottom-2 after:h-0.5 after:w-16 after:rounded-full after:bg-[#840000] after:content-[""] after:left-0',
              )}
            >
              Asal Usul
            </h2>
            <div className="space-y-3 text-pretty text-sm md:text-base">
              <p>
                Noor Ishmatuddin, S.I.P. (lahir di Betung, Kabupaten Banyuasin,
                22 April 1997) adalah seorang politisi muda Indonesia yang
                berasal dari Provinsi Sumatera Selatan. Ia dikenal sebagai sosok
                generasi muda yang visioner, dekat dengan masyarakat, dan
                berkomitmen kuat terhadap pembangunan daerah berbasis nilai,
                integritas, dan keberpihakan pada rakyat kecil.
              </p>
              <p>
                Noor memulai kiprah politiknya sejak usia sangat muda. Pada
                periode 2019–2024, ia dipercaya menjabat sebagai Wakil Ketua
                DPRD Kabupaten Banyuasin dari Fraksi Partai Gerindra, sekaligus
                tercatat sebagai salah satu pimpinan DPRD termuda di Indonesia,
                karena menduduki posisi strategis tersebut pada usia 22 tahun.
                Kepemimpinannya yang enerjik dan komunikatif menjadikannya salah
                satu representasi politisi muda daerah yang mampu berpikir maju
                tanpa meninggalkan akar tradisi dan nilai kearifan lokal.
              </p>
              <p>
                Pada Pemilu 2024, Noor kembali mendapatkan kepercayaan
                masyarakat dengan terpilih sebagai Anggota DPRD Kabupaten
                Banyuasin periode 2024–2029, dan kini menjabat di Komisi I DPRD
                Kabupaten Banyuasin yang membidangi pemerintahan, hukum, dan
                keamanan.
              </p>
              <p>
                Sebagai tokoh muda yang tumbuh di lingkungan pedesaan, Noor
                dikenal dekat dengan masyarakat akar rumput. Ia merupakan anak
                pertama dari tiga bersaudara, buah hati pasangan Bapak
                Syarifudin H. Daeng Pabulang seorang tokoh masyarakat yang telah
                menjabat sebagai Kepala Desa Karang Anyar selama tiga periode
                berturut-turut dan Ibu Hj. Nurbaiti, sosok ibu yang dikenal
                religius, lembut, serta aktif dalam kegiatan sosial
                kemasyarakatan. Adik keduanya bernama Noor Azmi Maulana,
                sementara adik bungsunya adalah Muhammad Farhan Fuadi. Ketiganya
                tumbuh dalam lingkungan keluarga yang menanamkan nilai kerja
                keras, disiplin, dan kepedulian terhadap sesama.
              </p>
              <p>
                Dikenal rendah hati dan mudah bergaul, Noor Ishmatuddin aktif
                dalam berbagai organisasi sosial dan kepemudaan, serta menjadi
                figur muda yang mendorong kolaborasi lintas sektor dari
                pemerintahan, komunitas, hingga dunia kreatif. Di usia yang
                masih sangat muda, ia berhasil menempatkan diri sebagai bagian
                dari generasi penerus Banyuasin yang siap melanjutkan estafet
                kepemimpinan dengan semangat “Muda Membangun”.
              </p>
            </div>
          </div>
        </div>
      </section>

      <ConnectWithMe />
    </>
  );
}
