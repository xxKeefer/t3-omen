import type { NextApiRequest, NextApiResponse } from "next";
import { env } from "~/env.mjs";

export default function preview(req: NextApiRequest, res: NextApiResponse) {
  let token;
  if (req.query.token) {
    token = env.SANITY_API_READ_TOKEN;
    if (!token) {
      throw new TypeError(`Missing SANITY_API_READ_TOKEN`);
    }
  }

  res.setPreviewData({ token });
  res.writeHead(307, { Location: "/" });
  res.end();
}
