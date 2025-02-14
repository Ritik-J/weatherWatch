import { Skeleton } from "./ui/skeleton";

const Loading_Skeleton = () => {
  return (
    <div className="space-y-6">
      <Skeleton className="h-[100px] w-full rounded-lg grid gap-2" />
      <section className="grid gap-6">
        <Skeleton className="h-[300px] w-full rounded-lg" />
        <Skeleton className="h-[300px] w-full rounded-lg" />
        <section className="gird gap-6 md:grid-cols-2">
          <Skeleton className="h-[300px] w-full rounded-lg" />
          <Skeleton className="h-[300px] w-full rounded-lg" />
        </section>
      </section>
    </div>
  );
};

export default Loading_Skeleton;
