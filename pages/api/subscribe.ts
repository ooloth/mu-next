// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

// See: https://ikartik.com/tutorials/nextjs-email-signup-part1
// See: https://leerob.io/blog/mailchimp-next-js
// See: https://www.youtube.com/watch?v=Rzlop3Bgk1Q

import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  name: string
}

export default (req: NextApiRequest, res: NextApiResponse<Data>) => {
  res.statusCode = 200
  res.json({ name: 'John Doe' })
}
