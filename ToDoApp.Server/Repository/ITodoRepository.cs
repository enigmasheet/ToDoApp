
using ToDoApp.Server.Models;

namespace ToDoApp.Server.Repository
{
    public interface ITodoRepository
    {
        Task<IEnumerable<Todo>> GetAllTodosAsync(); // Renamed to match implementation
        Task<Todo> GetTodoByIdAsync(int id);        // Return type corrected to Task<Todo>
        Task<int> AddTodoAsync(Todo todo);
        Task<int> UpdateTodoAsync(Todo todo);
        Task<int> DeleteTodoAsync(int id);          // Return type corrected to Task<int>
    }
}
