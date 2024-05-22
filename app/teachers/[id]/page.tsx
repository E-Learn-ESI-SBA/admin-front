import Teachers from "@/components/teachers/profile";

export default async function Page ({ params }: { params: { id: string } }) {

  return (
    <div>
       <Teachers />
    </div>
  );
}
