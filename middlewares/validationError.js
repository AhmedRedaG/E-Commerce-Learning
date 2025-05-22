import { validationResult } from "express-validator";

export const validationEmailError = (req, res, next) => {
  const validationResults = validationResult(req);
  if (!validationResults.isEmpty()) {
    req.flash("error", validationResults.array()[0].msg);
    return res.redirect(`${req.url}/?email=${req.body.email}`);
  }
  next();
};

export const validationNameEmailError = (req, res, next) => {
  const validationResults = validationResult(req);
  if (!validationResults.isEmpty()) {
    req.flash("error", validationResults.array()[0].msg);
    return res.redirect(
      `${req.url}/?email=${req.body.email}&name=${req.body.name}`
    );
  }
  next();
};

export const validationTokenError = (req, res, next) => {
  const validationResults = validationResult(req);
  if (!validationResults.isEmpty()) {
    req.flash("error", validationResults.array()[0].msg);
    return res.redirect(
      `${req.url}/${encodeURIComponent(req.body.hashedToken)}`
    );
  }
  next();
};
