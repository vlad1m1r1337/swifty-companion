async function getUserData(user: string) {
    if(!token) return;
    try {
        const response = await axios.get(`https://api.intra.42.fr/v2/users/${user}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        setUser(response.data);
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error("Error fetching cursus data:", error.response?.data || error.message);
    }
}

export default getUserData;