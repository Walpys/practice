
import { UserProfileTab } from "../components/UserProfileTab";
import { useAuthStore } from "../store/useAuth.store";


export const ProfilePage = () => {
    const userId = useAuthStore((state) => state.userId);
    return (
        <UserProfileTab userId = {userId}></UserProfileTab>
    );
}