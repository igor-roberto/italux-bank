import { FaLongArrowAltRight } from "react-icons/fa";
import heroImage from "../../assets/home-bank.png"

const Hero = () => {
  return (
    <section className="container mx-auto flex flex-col md:flex-row justify-between items-center pt-44 pb-6 px-4 sm:px-6 lg:px-8">

        {/*col esquerda */}
        <div className="w-full md:w-1/2 space-y-8">
            {/* bandagem */}
            <div className='flex items-center gap-2 bg-gray-50 w-fit px-4 py-2 rounded-full hover:bg-gray-100 transition-colors cursor-pointer group'>
                <span className='group-hover:scale-110 transition-transform'>🌐</span>
                <span className='text-sm font-bold'>100% digital. 100% seu.</span>
            </div>

            <h1 className='text-4xl md:text-5xl lg:text-6xl font-bold'>Controle total do seu  <span className='text-orange-500'>dinheiro com segurança,</span> praticidade e zero burocracia <span className='inline-block ml-2 animate-pulse'>🔐</span></h1>

            <p className="text-gray-600 text-lgg md:text-xl max-w-xl">Solicite seu cartão de crédito em poucos cliques e comece a aproveitar todos os benefícios de um banco inteligente. Com zero anuidade, controle total pelo app e aprovação rápida, o itaLux coloca o poder financeiro na sua mão.</p>

            <a href="#">
                <button className="group gap-2 flex items-center bg-orange-500 rounded-full cursor-pointer px-5 py-3 text-white hover:bg-orange-600 transition-all">Peça já o seu! <FaLongArrowAltRight size={18} className="group-hover:translate-x-1 transition"/>
                </button>
            </a>
        </div>

        {/*col direita */}
        <div className="w-full md:w-1/2 hidden md:flex">
        <div className="relative">
            <img src={heroImage} alt="hero image"  className="relative z-10 hover:scale-[1.02] transition-transform duration-300"/>
        </div>
        
        </div>
    </section>
  )
}

export default Hero