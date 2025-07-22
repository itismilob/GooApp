import type { Controller } from '@/types/defaultTypes';

import userService from '@/services/userServices';
import { UserNotFound } from '@/utils/customError';

/**
 * CREATE
 * User 생성
 */
export const createUser: Controller = async (req, res) => {
  const newUser = await userService.createUser();
  res.status(201).json(newUser);
};

/**
 * READ
 * get User by _id
 */
export const getUser: Controller = async (req, res) => {
  const { userID } = req.params;
  const user = await userService.getUser(userID);

  if (user) {
    res.status(200).json(user);
  } else {
    // 유저가 없을 경우 에러 처리
    throw new UserNotFound();
  }
};

/**
 * READ
 * get top score 100 Users
 */
export const getTop100: Controller = async (req, res) => {
  const topUsers = await userService.getTop100();
  res.status(200).json(topUsers);
};

/**
 * UPDATE
 * update User top score
 */
export const updateUserTopScore: Controller = async (req, res) => {
  const { userID, score } = req.body;
  const newRank = await userService.updateUserScore(userID, score);
  if (newRank) {
    res.status(200).json({ rank: newRank });
  } else {
    // 변경 사항 없음
    res.status(204).json({ rank: 0 });
  }
};
