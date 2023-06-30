import axios from "axios";

const API = axios.create({ baseURL: "https://every-note-backend.vercel.app/" });

API.interceptors.request.use((req) => {
    if (localStorage.getItem('profile')) {
        req.headers.authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`
    }
    return req;
})

export const fetchPosts = () => API.get('/posts');
export const createPost = (newPost) => API.post('/posts', newPost);
export const likePost = (id) => API.patch(`/posts/${id}/likePost`);
export const updatePost = (id, updatedPost) => API.patch(`/posts/${id}`, updatedPost);
export const deletePost = (id) => API.delete(`/posts/${id}`);
export const fetchPostsBySearch = (searchQuery) => API.get(`/posts/search?searchQuery=${searchQuery.search || 'none'}&tags=${searchQuery.tags}`);
export const fetchPost = (id) => API.get(`/posts/${id}`);
export const comment = (commenter, comment, id) => API.post(`/posts/${id}/commentPost`, { commenter, comment });
export const deleteUser = (id) => API.delete(`/user/${id}`);
export const userprofile = (id) => API.get(`/user/profile/${id}`)
export const followUser = (id) => API.patch(`/user/follow/${id}`);


export const signIn = (formData) => API.post('user/signin', formData);
export const signUp = (formData) => API.post('user/signup', formData);
