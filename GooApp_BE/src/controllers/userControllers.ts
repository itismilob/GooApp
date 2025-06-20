import type { Controller } from '@/types/defaultTypes';

// import userService from '@/services/userServices';

export const createUser: Controller = async (req, res, next) => {
  try {
    // const newUser = await userService.createUser();

    // res.status(201).json(newUser);

    res.send(200);
  } catch (error) {
    next(error);
  }
};

export const getUser: Controller = (req, res, next) => {
  try {
    res.send(200);
  } catch (error) {
    next(error);
  }
};

export const getTop100: Controller = (req, res, next) => {
  try {
    res.send(200);
  } catch (error) {
    next(error);
  }
};

export const updateUserScore: Controller = (req, res, next) => {
  try {
    res.send(200);
  } catch (error) {
    next(error);
  }
};
