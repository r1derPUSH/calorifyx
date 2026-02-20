import Day from "@/components/day/Day";

interface Props {
  params: Promise<{
    date: string;
  }>;
}

export default async function Page({ params }: Props) {
  const { date } = await params;

  return <Day date={date} />;
}
