
using Dapper;
using Microsoft.Data.SqlClient;
using ToDoApp.Server.Models;

namespace ToDoApp.Server.Repository
{
    public class TodoRepository : ITodoRepository
    {
        private readonly string _connectionString;

        public TodoRepository(string connectionString)
        {
            _connectionString = connectionString;
        }

        // Get all todos
        public async Task<IEnumerable<Todo>> GetAllTodosAsync()
        {
            using var connection = new SqlConnection(_connectionString);
            return await connection.QueryAsync<Todo>("SELECT * FROM Todos");
        }

        // Get todo by Id
        public async Task<Todo> GetTodoByIdAsync(int id)
        {
            using var connection = new SqlConnection(_connectionString);
            return await connection.QueryFirstOrDefaultAsync<Todo>(
                "SELECT * FROM Todos WHERE Id = @Id", new { Id = id });
        }

        // Add a new todo
        public async Task<int> AddTodoAsync(Todo todo)
        {
            using var connection = new SqlConnection(_connectionString);
            return await connection.ExecuteAsync(
                "INSERT INTO Todos (Title, IsCompleted) VALUES (@Title, @IsCompleted)", todo);
        }

        // Update an existing todo
        public async Task<int> UpdateTodoAsync(Todo todo)
        {
            using var connection = new SqlConnection(_connectionString);
            return await connection.ExecuteAsync(
                "UPDATE Todos SET Title = @Title, IsCompleted = @IsCompleted WHERE Id = @Id", todo);
        }

        // Delete a todo by Id
        public async Task<int> DeleteTodoAsync(int id)
        {
            using var connection = new SqlConnection(_connectionString);
            return await connection.ExecuteAsync("DELETE FROM Todos WHERE Id = @Id", new { Id = id });
        }
    }
}
