using System.ComponentModel.DataAnnotations;

namespace backend.Models;

public class PageView
{
    public Guid Id { get; set; }
    public Guid SessionId { get; set; }
    public VisitSession Session { get; set; } = null!;

    [MaxLength(300)] public string Path { get; set; } = "/";
    public DateTime ViewedAt { get; set; }
    public int DurationSeconds { get; set; }
}