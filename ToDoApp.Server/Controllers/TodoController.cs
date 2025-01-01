using Microsoft.AspNetCore.Mvc;
using ToDoApp.Server.Models;
using ToDoApp.Server.Repository;

namespace ToDoApp.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TodoController : ControllerBase
    {
        private readonly ITodoRepository _todoRepository;

        public TodoController(ITodoRepository todoRepository)
        {
            _todoRepository = todoRepository;
        }
        [HttpGet]
        public async Task<IActionResult> GetAllTodos()
        {
            var todos = await _todoRepository.GetAllTodosAsync();
            return Ok(todos);
        }
        [HttpGet("{id}")]
        public async Task<IActionResult> GetTodoById(int id)
        {
            var todo = await _todoRepository.GetTodoByIdAsync(id);
            if (todo == null) return NotFound();
            return Ok(todo);
        }
        [HttpPost]
        public async Task<IActionResult> AddTodo([FromBody] Todo todo)
        {
            if (todo == null) return BadRequest();
            var rowsAffected = await _todoRepository.AddTodoAsync(todo);
            if (rowsAffected > 0)
                return CreatedAtAction(nameof(GetTodoById), new { id = todo.Id }, todo);
            return StatusCode(500, "An error occurred while adding the todo.");

        }
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateTodo(int id, [FromBody] Todo todo)
        {
            if (todo == null || todo.Id != id) return BadRequest();
            var rowsAffected = await _todoRepository.UpdateTodoAsync(todo);
            if (rowsAffected == 0) return NotFound();
            return NoContent();
        }
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTodo(int id)
        {
            var rowsAffected = await _todoRepository.DeleteTodoAsync(id);
            if (rowsAffected == 0) return NotFound();
            return NoContent();
        }
    }
}
