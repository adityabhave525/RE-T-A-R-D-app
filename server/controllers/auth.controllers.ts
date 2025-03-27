import { Request, Response } from "express";

export async function signup(req: Request, res: Response) {
  try {
    const redis = req.app.locals.redis;

    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        error: "All fields are required",
      });
    }

    const userExists = await redis.get(`user:email:${email}`);

    if (userExists) {
      return res.status(409).json({
        error: "User already exists",
      });
    }

    const userId = `user_${Date.now()}`;

    await redis.set(
      `user:${userId}`,
      JSON.stringify({
        id: userId,
        email,
        password,
        createdAt: new Date().toISOString(),
      })
    );

    await redis.set(`user:${req.body.email}`, JSON.stringify(req.body));

    await redis.set(`user:email:${email}`, userId);

    res.status(201).json({
      success: true,
      message: "User created successfully",
      userId,
    });
  } catch (e) {
    console.log(e);
    res.status(500).send("Signup Failed");
  }
}

export async function login(req: Request, res: Response) {
  res.send("Login");
}
