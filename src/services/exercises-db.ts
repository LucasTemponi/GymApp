import axios, {AxiosResponse} from 'axios';
import {Exercise} from '../types/types';

const instance = axios.create({
  baseURL: 'https://exercisedb.p.rapidapi.com/exercises',
  timeout: 1000,
  headers: {
    'X-RapidAPI-Key': '16aebbac70msh81aa02278bca4ddp179321jsncc2788d06127',
    'X-RapidAPI': 'Host:exercisedb.p.rapidapi.com',
  },
});

export async function getExercises(
  page: number = 1,
): Promise<AxiosResponse<Exercise[]>> {
  const limit = 50;
  console.log(page);
  return await instance.get('', {
    params: {
      limit,
      offset: (page - 1) * limit,
    },
  });
}

export async function getBodyParts(
  page: number = 1,
): Promise<AxiosResponse<string[]>> {
  return await instance.get('/bodyPartList');
}

export async function getTargetMuscles(
  page: number = 1,
): Promise<AxiosResponse<string[]>> {
  const limit = 50;
  console.log(page);
  return await instance.get('/targetList');
}

export async function getEquipments(
  page: number = 1,
): Promise<AxiosResponse<string[]>> {
  const limit = 50;
  console.log(page);
  return await instance.get('/equipmentList');
}
