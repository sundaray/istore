import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === "POST") {
    return await createProduct(req, res);
  } else {
    return res
      .status(405)
      .json({ message: "Method not allowed", success: false });
  }
}

async function createProduct(req, res) {
  const { name, description, price, stockCount } = req.body;
  try {
    const newProduct = await prisma.product.create({
      data: {
        name,
        description,
        price,
        stockCount,
      },
    });
    return res.status(200).json({ ...newProduct, success: true });
  } catch (error) {
    console.error("Request error", error);
    res.status(500).json({ error: "Error creating question", success: false });
  }
}
