import type { Controller } from '@/types/defaultTypes';

// import userService from '@/services/userServices';

/**
 * CREATE
 * User 생성
 */
export const createUser: Controller = async (req, res, next) => {
  try {
    // const newUser = await userService.createUser();

    // res.status(201).json(newUser);

    res.send(200);
  } catch (error) {
    next(error);
  }
};

/**
 * READ
 * get User by _id
 */
export const getUser: Controller = (req, res, next) => {
  try {
    res.send(200);
  } catch (error) {
    next(error);
  }
};

/**
 * READ
 * get top score 100 Users
 */
export const getTop100: Controller = (req, res, next) => {
  try {
    res.send(200);
  } catch (error) {
    next(error);
  }
};

/**
 * UPDATE
 * update User top score
 */
export const updateUserTopScore: Controller = (req, res, next) => {
  try {
    res.send(200);
  } catch (error) {
    next(error);
  }
};
