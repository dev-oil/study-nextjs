interface Props {
  params: { id: string };
  searchParams: { code?: string };
}

const DashboardDetailPage = ({ params, searchParams }: Props) => {
  console.log(params);
  return (
    <div>
      DashboardDetailPage {params.id} code={searchParams.code}
    </div>
  );
};

export default DashboardDetailPage;
