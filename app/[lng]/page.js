import { getT } from '../i18n'

export default async function HomePage({ params }) {
  const { lng } = await params
  const { t } = await getT('landing')

  return (
    <main className="relative w-full h-full overflow-hidden">
      <h1 className="absolute top-[10000px] left-0 -z-0 text-center text-2xl font-bold">MANETmesh Technologies</h1>
      <div className="relative w-full h-full">
        <img
          src="https://oss.manetmesh.com/20250917/pic_index_1758076058400.jpg"
          className="w-full h-full object-cover"
          alt="MANETmesh Technologies"
        />
        <img
          src="https://oss.manetmesh.com/20250917/card_1758075817415.png"
          className="w-full md:w-[30vw] object-contain absolute bottom-0 right-0"
          alt="MANETmesh Technologies"
        />

        <div className="absolute bottom-[10000px] left-0 right-0 bg-black bg-opacity-60 text-white p-6">
          <div className="max-w-4xl mx-auto">
            <p className="text-sm md:text-base leading-relaxed">
              {t('description')}
            </p>
          </div>
        </div>
      </div>
    </main>
  )
}