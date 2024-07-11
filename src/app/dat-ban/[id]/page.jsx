import getDataAuth from "@/lib/getDataAuth";
import IndexDatBan from "@/sections/datban/IndexDatBan";

export default async function page({ params }) {
  const request = {
    api: `/tables?populate=floor&filters[id]=${params?.id}`,
    token:process.env.TOKEN
  }
  const dataTable = await getDataAuth(request)
  return (
    <IndexDatBan
      idTable={params.id}
      dataTable={dataTable?.data?.[0]}
    />
  )
}
