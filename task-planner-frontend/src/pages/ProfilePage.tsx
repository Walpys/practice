
import { UserProfileTab } from "../components/UserProfileTab";
import { useAuthStore } from "../store/useAuth.store";


export const ProfilePage = () => {
    const userId = useAuthStore((state) => state.userId);

    if(!userId){
        return(
            <h1>Error</h1>
        )
    }
    return (
        <UserProfileTab userId = {userId}></UserProfileTab>
    );
}