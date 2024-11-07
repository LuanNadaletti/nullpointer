import { useState, useEffect } from "react";
import { useAuth } from "../contexts/Auth"; 
import { findDownloadUrl } from "../services/fireBaseService"; 
import { getTimeAgoText } from "../utils/timeAgo"; 
import EditProfileModal from "../components/EditProfileModal";

const mockUserStats = {
    questions: 5,
    answers: 12,
    reputation: 128,
    memberSince: "2024-01-15T10:30:00",
    recentActivity: [
        {
            id: 1,
            type: "question",
            title: "Como resolver o erro NullPointerException em Java?",
            date: "2024-03-20T10:30:00"
        },
        {
            id: 2,
            type: "answer",
            title: "Resposta sobre Spring Security com JWT",
            date: "2024-03-18T15:45:00"
        }
    ]
};

const Profile = () => {
    const { user } = useAuth();
    
    const [profilePictureUrl, setProfilePictureUrl] = useState<string>("");
    //modal
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);

    useEffect(() => {
        const loadProfilePicture = async () => {
            if (user) {
                const url = await findDownloadUrl(user.id);
                setProfilePictureUrl(url);
            }
        };

        loadProfilePicture();
    }, [user]);

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
                                {/* getTimeAgoText pra mostrar há quanto tempo é membro */}
                                <p className="text-gray-500 text-sm mt-1">
                                    Membro desde {getTimeAgoText(mockUserStats.memberSince)}
                                </p>
                            </div>

                            <div className="mt-6 border-t pt-6">
                                <div className="space-y-4">
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Reputação</span>
                                        <span className="font-semibold">{mockUserStats.reputation}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Perguntas</span>
                                        <span className="font-semibold">{mockUserStats.questions}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Respostas</span>
                                        <span className="font-semibold">{mockUserStats.answers}</span>
                                    </div>
                                </div>
                            </div>

                            {/* modal de edição */}
                            <div className="mt-6">
                                <button 
                                    onClick={() => setIsEditModalOpen(true)}
                                    className="w-full px-4 py-2 bg-cyan-500 text-white rounded-md hover:bg-cyan-600 transition"
                                >
                                    Editar Perfil
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="flex-1">
                        <div className="bg-white rounded-lg shadow">
                            <div className="p-6 border-b">
                                <h3 className="text-lg font-semibold">Atividade Recente</h3>
                            </div>

                            {/* últimas coisas que o usuário fez */}
                            <div className="divide-y">
                                {mockUserStats.recentActivity.map(activity => (
                                    <div key={activity.id} className="p-6">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <span className="text-sm text-gray-500 capitalize">
                                                    {activity.type === 'question' ? 'Perguntou' : 'Respondeu'}
                                                </span>
                                                <h4 className="text-blue-600 hover:text-blue-800 cursor-pointer mt-1">
                                                    {activity.title}
                                                </h4>
                                            </div>
                                            <span className="text-sm text-gray-500">
                                                {getTimeAgoText(activity.date)}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="bg-white rounded-lg shadow mt-6">
                            <div className="p-6 border-b">
                                <h3 className="text-lg font-semibold">Minhas Perguntas</h3>
                            </div>
                            <div className="p-6 text-center text-gray-500">
                                Nenhuma pergunta feita ainda
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <EditProfileModal
                isOpen={isEditModalOpen}
                onClose={() => setIsEditModalOpen(false)}
                currentUsername={user?.username || ""}
            />
        </div>
    );
};

export default Profile; 