import type { Controller } from '@/types/defaultTypes';

import userService from '@/services/userServices';

/**
 * CREATE
 * User 생성
 */
export const createUser: Controller = async (req, res, next) => {
  try {
    const newUser = await userService.createUser();
    res.status(201).json(newUser);

    res.send(200);
  } catch (error) {
    next(error);
  }
};

/**
 * READ
 * get User by _id
 */
export const getUser: Controller = async (req, res, next) => {
  try {
    const { userID } = req.params;
    const user = await userService.getUser(userID);

    if (user) {
      res.status(200).json(user);
    } else {
      // 유저가 없을 경우 에러 처리
    }
  } catch (error) {
    next(error);
  }
};

/**
 * READ
 * get top score 100 Users
 */
export const getTop100: Controller = async (req, res, next) => {
  try {
    const topUsers = await userService.getTop100();
    res.status(200).json(topUsers);
  } catch (error) {
    next(error);
  }
};

/**
 * UPDATE
 * update User top score
 */
export const updateUserTopScore: Controller = async (req, res, next) => {
  try {
    const { userID, score } = req.body;
    await userService.updateUserScore(userID, score);
  } catch (error) {
    next(error);
  }
};
