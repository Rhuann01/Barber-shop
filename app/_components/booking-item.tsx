import { Avatar, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Card, CardContent } from "./ui/card";

export const BookingItem = () => {
  /* TODO receber agendamentos por props */

  return (
    <Card>
      <CardContent className="flex justify-between p-0">
        <div className="flex flex-col gap-2 pl-7">
          <Badge className="bg-purple-950 text-purple-300">Confirmado</Badge>
          <h3 className="font-semibold">Corte de cabelo</h3>
          <div className="flex items-center gap-2">
            <Avatar className="w-6 h-6">
              <AvatarImage src="https://i.pinimg.com/1200x/a1/8e/5f/a18e5f09224c7688da94720f387a2c48.jpg" />
            </Avatar>
            <p className="font-light">Vintager Barber</p>
          </div>
        </div>
        <div className=" flex flex-col w-30 px-5 text-sm items-center justify-center border-l-2 border-solid">
          <p>Abril</p>
          <p className="text-2xl font-semibold">17</p>
          <p>21:01</p>
        </div>
      </CardContent>
    </Card>
  );
};
