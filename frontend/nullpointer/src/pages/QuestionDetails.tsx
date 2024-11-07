import { getTimeAgoText } from "../utils/timeAgo";

const QuestionDetails = () => {
  const mockQuestion = {
    id: 1,
    title: "Como resolver o erro NullPointerException em Java?",
    questionText: `Estou tendo problemas com NullPointerException no meu código Java. 
    
    Quando tento acessar um objeto, recebo o seguinte erro:
    java.lang.NullPointerException
        at com.example.MyClass.someMethod(MyClass.java:45)
        
    Como posso resolver isso e quais são as melhores práticas para evitar esse tipo de erro?`,
    creationDate: "2024-03-20T10:30:00",
    user: {
      id: 1,
      username: "joaodev",
      email: "joao@email.com"
    },
    comments: [
      {
        id: 1,
        text: "Você precisa verificar se o objeto não é nulo antes de acessá-lo usando uma condição if",
        user: {
          id: 2,
          username: "mariadev"
        },
        creationDate: "2024-03-20T11:00:00"
      }
    ]
  };

  return (
    <div className="w-full flex justify-center mt-8">
      <div className="w-3/5">
        <div className="border-b pb-4">
          <h1 className="text-2xl font-bold mb-4">{mockQuestion.title}</h1>
          <div className="flex items-center text-sm text-gray-600">
            <span>Perguntado {getTimeAgoText(mockQuestion.creationDate)}</span>
            <span className="mx-2">•</span>
            <span>Visualizado 42 vezes</span>
          </div>
        </div>

        <div className="mt-6 border-b pb-6">
          <div className="flex">
            <div className="flex flex-col items-center mr-6 w-10">
              <button className="text-gray-400 hover:text-gray-600">
                <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                </svg>
              </button>
              <span className="text-xl my-2">0</span>
              <button className="text-gray-400 hover:text-gray-600">
                <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </div>

            <div className="flex-1">
              <div className="prose max-w-none">
                <pre className="whitespace-pre-wrap">{mockQuestion.questionText}</pre>
              </div>
              
              <div className="mt-8 flex justify-end">
                <div className="bg-blue-50 p-3 rounded-lg">
                  <div className="text-sm text-gray-600">
                    perguntado {getTimeAgoText(mockQuestion.creationDate)}
                  </div>
                  <div className="flex items-center mt-2">
                    <img
                      src="https://cdn3.iconfinder.com/data/icons/essential-rounded/64/Rounded-31-512.png"
                      alt="avatar"
                      className="w-8 h-8 rounded-md"
                    />
                    <div className="ml-2">
                      <div className="text-blue-600">{mockQuestion.user.username}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6">
          <h2 className="text-lg font-semibold mb-4">Comentários</h2>
          
          {mockQuestion.comments.map(comment => (
            <div key={comment.id} className="border-b py-4">
              <div className="flex items-start">
                <div className="flex-1">
                  <pre className="whitespace-pre-wrap text-sm">{comment.text}</pre>
                  <div className="mt-2 flex items-center text-sm">
                    <span className="text-blue-600">{comment.user.username}</span>
                    <span className="mx-2 text-gray-500">•</span>
                    <span className="text-gray-500">{getTimeAgoText(comment.creationDate)}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}

          <div className="mt-6">
            <textarea
              placeholder="Adicione um comentário..."
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={3}
            />
            <div className="mt-2 flex justify-end">
              <button className="px-4 py-2 bg-cyan-500 text-white rounded-md hover:bg-cyan-600">
                Adicionar comentário
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestionDetails; 