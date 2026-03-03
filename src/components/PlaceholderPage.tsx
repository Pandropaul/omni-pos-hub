import { Construction } from "lucide-react";

interface PlaceholderPageProps {
  title: string;
  description: string;
}

const PlaceholderPage = ({ title, description }: PlaceholderPageProps) => (
  <div className="flex flex-col items-center justify-center h-[60vh] text-center">
    <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-4">
      <Construction className="w-8 h-8 text-primary" />
    </div>
    <h1 className="text-2xl font-bold mb-2">{title}</h1>
    <p className="text-muted-foreground max-w-md">{description}</p>
  </div>
);

export default PlaceholderPage;
