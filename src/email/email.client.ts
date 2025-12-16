import nodemailer from "nodemailer";
import { config } from "../config/index.js";

const nodemailerConfig = config.nodemailer;

export const mailer = nodemailer.createTransport({
  host: nodemailerConfig.host,
  port: nodemailerConfig.port,
  secure: false,
  auth: {
    user: nodemailerConfig.auth.user,
    pass: nodemailerConfig.auth.pass,
  },
});
