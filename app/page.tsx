import {Button} from "./_components/ui/button"
import { Switch } from "./_components/ui/switch"

export default function Home(){
  return (
    <section className=" flex flex-col gap-2 items-center justify-center w-screen h-screen bg-neutral-800 text-white font-black ">
      <h1 className="">Hello next, quanto tempo</h1>
      <Button> Teste </Button> 
      <Switch />
    </section>
  )
}