import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import EditProfileModal from "../components/EditProfileModal";
import { useAuth } from "../contexts/Auth";
import { User, UserStats } from "../models/user";
import { findDownloadUrl } from "../services/fireBaseService";
import { getUserById, getUserStats } from "../services/userService";
import QuestionModel from "../models/question/question";
import { getQuestionsByUserId } from "../services/questionService";

const Profile = () => {
    const { user: authUser } = useAuth();
    const { id } = useParams<{ id: string }>();

    const { data: user } = useQuery<User, Error>({
        queryKey: ['user', id],
        queryFn: () => getUserById(id!),
        refetchOnWindowFocus: false,
        enabled: !!id,
    });

    const { data: userStats } = useQuery<UserStats, Error>({
        queryKey: ['userStats', id],
        queryFn: () => getUserStats(id!),
        refetchOnWindowFocus: false,
        enabled: !!id,
    });

    const { data: userQuestions } = useQuery<QuestionModel[], Error>({
        queryKey: ['userQuestions', id],
        queryFn: () => getQuestionsByUserId(id!),
        refetchOnWindowFocus: false,
        enabled: !!id
    });

    const [profilePictureUrl, setProfilePictureUrl] = useState<string>("");
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);

    useEffect(() => {
        const loadProfilePicture = async () => {
            if (authUser) {
                const url = await findDownloadUrl(authUser.id);
                setProfilePictureUrl(url);
            }
        };

        loadProfilePicture();
    }, [user, authUser]);

    return (
        <div className="w-full flex justify-center mt-8">
            <div className="w-3/5">
                <div className="flex items-start space-x-8">
                    <div className="w-1/3">
                        <div className="bg-white rounded-lg shadow p-6">
                            <div className="flex flex-col items-center">
                                <img
                                    src={profilePictureUrl || "https://cdn3.iconfinder.com/data/icons/essential-rounded/64/Rounded-31-512.png"}
                                    alt="Profile"
                                    className="w-32 h-32 rounded-lg mb-4"
                                />
                                <h2 className="text-xl font-bold">{user?.username}</h2>
                                <p className="text-gray-500 text-sm mt-1">
                                    Member since {new Date(user?.registrationDate!).toLocaleDateString()}
                                </p>
                            </div>

                            <div className="mt-6 border-t pt-6">
                                <div className="space-y-4">
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Questions</span>
                                        <span className="font-semibold">{userStats?.questionsCount}</span>
                                    </div>

                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Answers</span>
                                        <span className="font-semibold">{userStats?.answersCount}</span>
                                    </div>
                                </div>
                            </div>

                            {/* edit profile modal */}
                            <div className="mt-6">
                                <button
                                    onClick={() => setIsEditModalOpen(true)}
                                    className="w-full px-4 py-2 bg-cyan-500 text-white rounded-md hover:bg-cyan-600 transition"
                                >
                                    Edit Profile
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="flex-1">
                        <div className="bg-white rounded-lg shadow">
                            <div className="p-6 border-b">
                                <h3 className="text-lg font-semibold">My Questions</h3>
                            </div>
                            <div className="p-6 divide-y">
                                {userQuestions && userQuestions.length > 0 ? (
                                    userQuestions.map((question) => (
                                        <div key={question.id} className="py-4">
                                            <Link to={`/questions/${question.id}`}>
                                                <h4 className="text-blue-600 hover:underline">
                                                    {question.title}
                                                </h4>
                                            </Link>
                                            <p className="text-gray-500 text-sm">
                                                Asked on {new Date(question.creationDate).toLocaleDateString()}
                                            </p>
                                        </div>
                                    ))
                                ) : (
                                    <div className="text-center text-gray-500">
                                        No questions asked yet.
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <EditProfileModal
                isOpen={isEditModalOpen}
                onClose={() => setIsEditModalOpen(false)}
                userId={authUser?.id!}
                initialData={user!}
            />
        </div>
    );
};

export default Profile;
