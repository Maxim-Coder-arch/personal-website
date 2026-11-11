namespace backend.Models;

public class Visitor
{
    public Guid Id { get; set; }
    public DateTime FirstSeenAt { get; set; }
    public DateTime LastSeenAt { get; set; }
    public int SessionsCount { get; set; }
    public List<VisitSession> Sessions { get; set; } = [];
}