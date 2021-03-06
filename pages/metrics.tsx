import Outer from 'layouts/outer'
import Header from 'components/header'

export default function Tracks({ data }) {
  return (
    <Outer narrow>
      <Header title="Stats" summary="Numbers I track just for fun." />

      <main>{/* <pre>{JSON.stringify(data, null, 2)}</pre> */}</main>
    </Outer>
  )
}
