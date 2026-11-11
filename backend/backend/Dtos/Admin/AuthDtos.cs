using System.ComponentModel.DataAnnotations;

namespace backend.Dtos.Admin;

public class LoginRequest
{
    [Required, StringLength(256)]
    public string Email { get; set; } = string.Empty;

    [Required, StringLength(256)]
    public string Password { get; set; } = string.Empty;
}

public record AdminMeResponse(string Email);