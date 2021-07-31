import Product from '../../models/userProduct';


export const CREATE_PRODUCT = 'CREATE_PRODUCT';

export const SET_users = 'SET_users';

export const fetchUsers = () => {
  
  return async (dispatch, getState) => {
    
    const userId = getState().auth.userId;
    try {
      const response = await fetch(
        'https://supaprix-94a84-default-rtdb.firebaseio.com/users.json'
      );
      if (!response.ok) {
        throw new Error('Something went wrong!');
      }

      const resData = await response.json();
 
      console.log(resData);
      
      const loadedusers = [];

      for (const key in resData) {
        loadedusers.push(
          new Product(
            key,
            resData[key].ownerId,
            resData[key].ownerPushToken,
            resData[key].title,
            resData[key].imageUrl,
            resData[key].image2Url,
            resData[key].image3Url,
            resData[key].description,
            resData[key].price,
            resData[key].quantity,
            resData[key].category,
            resData[key].coupon,
            resData[key].status,
            resData[key].listing
          )
        );
      }

      dispatch({
        type: SET_users,
        users: loadedusers,
        userusers: loadedusers.filter(prod => prod.ownerId === userId)
      });
    } catch (err) {
      // send to custom analytics server
      throw err;
    }
  };
};


export const createUser = (title, description, imageUrl,  image2Url,
  image3Url, price, quantity, category, coupon, status, listing) => {
  return async (dispatch, getState) => {
    
    const token = getState().auth.token;
    const userId = getState().auth.userId;
    const response = await fetch(
      `https://supaprix-94a84-default-rtdb.firebaseio.com/users.json?auth=${token}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          title,
          description,
          imageUrl,
          image2Url,
          image3Url,
          price,
          quantity,
          category,
          coupon,
          status,
          listing,
          ownerId: userId,
          ownerPushToken: pushToken,
        })
      }
    );

    const resData = await response.json();
  
    dispatch({
      type: CREATE_PRODUCT,
      productData: {
        id: resData.name,
        title,
        description,
        imageUrl,
        image2Url,
        image3Url,
        price,
        quantity,
        category,
        coupon,
        status,
        listing,
        ownerId: userId,
        pushToken: pushToken
      }
    });
  };
};

export const reduceProductQuantity = () => {
  
}

export const updateProduct = (id, title, description, imageUrl,image2Url,
  image3Url, price, quantity, category, coupon, listing) => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    const response = await fetch(
      `https://supaprix-94a84-default-rtdb.firebaseio.com/users/${id}.json?auth=${token}`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          title,
          description,
          imageUrl,
          image2Url,
          image3Url,
          price,
          quantity,
          category,
          coupon,
          listing
        })
      }
    );

    if (!response.ok) {
      throw new Error('Something went wrong!');
    }

    dispatch({
      type: UPDATE_PRODUCT,
      pid: id,
      productData: {
        title,
        description,
        imageUrl,
        image2Url,
        image3Url,
        price,
        quantity,
        category,
        coupon,
        listing
      }
    });
  };
};
