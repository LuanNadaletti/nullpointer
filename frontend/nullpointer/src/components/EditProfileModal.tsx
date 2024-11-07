import { useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";

interface EditProfileModalProps {
    isOpen: boolean;        
    onClose: () => void;    
    currentUsername: string; 
}

// TODO: Implementação ppra fazer
// 1. Criar função para fazer upload da imagem no Firebase (se quiser, não sei se vai ser necessário)
// 3. Adicionar validações nos campos pra evitar equivocos

const EditProfileModal: React.FC<EditProfileModalProps> = ({ isOpen, onClose, currentUsername }) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string>("");

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setSelectedFile(file);
            setPreviewUrl(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        onClose();
    };

    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={onClose}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black bg-opacity-25" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                <Dialog.Title
                                    as="h3"
                                    className="text-lg font-medium leading-6 text-gray-900 mb-4"
                                >
                                    Editar Perfil
                                </Dialog.Title>

                                <form onSubmit={handleSubmit}>
                                    <div className="space-y-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Foto de Perfil
                                            </label>
                                            <div className="flex items-center gap-4">
                                                <img
                                                    src={previewUrl || "https://cdn3.iconfinder.com/data/icons/essential-rounded/64/Rounded-31-512.png"}
                                                    alt="Preview"
                                                    className="w-20 h-20 rounded-lg object-cover bg-gray-100"
                                                />
                                                <input
                                                    type="file"
                                                    accept="image/*"
                                                    onChange={handleFileChange}
                                                    className="text-sm text-gray-500
                                                    file:mr-4 file:py-2 file:px-4 
                                                    file:rounded-full file:border-0 
                                                    file:text-sm file:font-semibold 
                                                    file:bg-cyan-50 file:text-cyan-700 
                                                    hover:file:bg-cyan-100
                                                    cursor-pointer"
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Username
                                            </label>
                                            <input
                                                type="text"
                                                defaultValue={currentUsername}
                                                className="w-full px-3 py-2 border border-gray-300 
                                                rounded-md shadow-sm bg-white
                                                text-gray-900
                                                focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Bio
                                            </label>
                                            <textarea
                                                rows={3}
                                                className="w-full px-3 py-2 border border-gray-300 
                                                rounded-md shadow-sm bg-white
                                                text-gray-900
                                                focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
                                                placeholder="Conte um pouco sobre você..."
                                            />
                                        </div>
                                    </div>

                                    <div className="mt-6 flex justify-end gap-3">
                                        <button
                                            type="button"
                                            onClick={onClose}
                                            className="px-4 py-2 text-sm font-medium text-gray-700 
                                            bg-gray-100 rounded-md 
                                            hover:bg-gray-200 
                                            focus:outline-none focus:ring-2 focus:ring-gray-500"
                                        >
                                            Cancelar
                                        </button>
                                        <button
                                            type="submit"
                                            className="px-4 py-2 text-sm font-medium text-white 
                                            bg-cyan-500 rounded-md 
                                            hover:bg-cyan-600 
                                            focus:outline-none focus:ring-2 focus:ring-cyan-500"
                                        >
                                            Salvar
                                        </button>
                                    </div>
                                </form>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
};

export default EditProfileModal; 