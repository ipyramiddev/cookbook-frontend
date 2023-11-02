import { FeedbackType, setFeedback } from 'reducers/recipeSlice';
import api from 'utils/api';
import { store } from 'app/store';

const { dispatch } = store;

export const getFeedback = async (recipeId: number) => {
  try {
    const res = await api.get(`api/recipes/${recipeId}/feedback`);

    console.log(res);

    const feedbacks: FeedbackType[] = res.data.feedbacks.map(
      (feedback: any) => {
        return {
          username: feedback.user.name,
          rating: feedback.rating,
          comment: feedback.comment,
        };
      },
    );

    dispatch(setFeedback(feedbacks));
  } catch (error) {
    console.error(error);
  }
};

export const createFeedback = async ({
  recipeId,
  rating,
  comment,
}: {
  recipeId: number;
  rating: number;
  comment: string;
}): Promise<boolean> => {
  try {
    await api.post(`api/recipes/${recipeId}/feedback`, {
      rating,
      comment,
    });
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};
