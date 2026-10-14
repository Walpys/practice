
import { UserProfileTab } from "../components/UserProfileTab";
import { useAuthStore } from "../store/useAuth.store";
import { ErrorPage } from "../components/shared/ErrorPage";


export const ProfilePage = () => {
    const userId = useAuthStore((state) => state.userId);

    if (!userId) {
        return <ErrorPage statusCode={401} title="Not Authenticated" message="You must be logged in to view your profile." />;
    }
    return (
        <UserProfileTab userId={userId}></UserProfileTab>
    );
}
