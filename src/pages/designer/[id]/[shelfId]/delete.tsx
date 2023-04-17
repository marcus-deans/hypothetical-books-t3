import type {
  GetStaticPaths,
  GetStaticPropsContext,
  InferGetStaticPropsType,
} from "next";
import superjson from "superjson";
import { createProxySSGHelpers } from "@trpc/react-query/ssg";
import { useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { appRouter } from "../../../../server/api/root";
import { api } from "../../../../utils/api";
import { createInnerTRPCContext } from "../../../../server/api/trpc";
import DeletePane from "../../../../components/DeletePane";
import { prisma } from "../../../../server/db";
import type { CustomUser } from "../../../../schema/user.schema";
import { useSession } from "next-auth/react";

export default function DeleteShelf(
  props: InferGetStaticPropsType<typeof getStaticProps>
) {
  const id = props.id;
  const shelfId = props.shelfId;

  const shelfDetailsQuery = api.shelves.getById.useQuery({
    id: shelfId,
  });
  const caseDetailsQuery = api.cases.getById.useQuery({ id: id });
  const currentShelfCount = caseDetailsQuery.data?.shelfCount ?? 0;
  const currentName = caseDetailsQuery.data?.name ?? "";
  const currentWidth = caseDetailsQuery.data?.width ?? 0;
  const editMutation = api.cases.edit.useMutation();
  const { data: session, status } = useSession();
  const user = session?.user as CustomUser;

  const deleteMutation = api.shelves.delete.useMutation();
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();
  // if (router.isFallback) {
  if (shelfDetailsQuery.status !== "success") {
    return <div className="text-white">Loading...</div>;
  }
  const { data } = shelfDetailsQuery;

  const handleDelete = () => {
    setIsDeleting(true);
    try {
      const deleteResult = deleteMutation.mutate({ id: shelfId });
      const newCount = currentShelfCount - 1;
      const editResult = editMutation.mutate({
        caseId: id,
        name: currentName,
        width: currentWidth,
        shelfCount: newCount,
        shelvesIds: [],
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        user: user!,
      });
      setTimeout(() => {
        void router.push(`/designer/${encodeURIComponent(id)}/detail`);
      }, 500);
    } catch (error) {
      console.log(error);
      setIsDeleting(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center py-2">
      <Head>
        <title>Delete Shelf Design</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <DeletePane
        itemIdentifier={shelfId}
        itemName={"Shelf Design"}
        isDeleting={isDeleting}
        handleDelete={handleDelete}
        cancelUrl={`/designer/${encodeURIComponent(id)}/detail`}
      />
      <ToastContainer></ToastContainer>
    </div>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const shelves = await prisma.shelf.findMany({
    select: {
      id: true,
      case: {
        select: {
          id: true,
        },
      },
    },
  });
  const paths = shelves.map((shelf) => ({
    params: { id: shelf.case.id, shelfId: shelf.id },
  }));

  return { paths, fallback: true };
};

export async function getStaticProps(
  context: GetStaticPropsContext<{ id: string; shelfId: string }>
) {
  const ssg = createProxySSGHelpers({
    router: appRouter,
    ctx: createInnerTRPCContext({ session: null }),
    transformer: superjson,
  });
  const id = context.params?.id as string;
  const shelfId = context.params?.shelfId as string;

  await ssg.shelves.getById.prefetch({ id: shelfId });

  return {
    props: {
      trpcState: ssg.dehydrate(),
      id,
      shelfId,
    },
    revalidate: 1,
  };
}
