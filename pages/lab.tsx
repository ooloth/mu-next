import Outer from 'layouts/outer'
import Header from 'components/header'

export default function Lab({ data }) {
  return (
    <Outer narrow>
      <Header title="Lab" summary="Trying things out to see what happens." />

      <main>{/* <pre>{JSON.stringify(data, null, 2)}</pre> */}</main>
    </Outer>
  )
}
