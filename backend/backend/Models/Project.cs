using System.Text.Json.Serialization;

namespace backend.Models
{
    public class Project
    {
        [JsonPropertyName("id")]
        public Guid Id { get; set; } = Guid.NewGuid();

        [JsonPropertyName("title")]
        public string Title { get; set; }

        [JsonPropertyName("subtitle")]
        public string Subtitle { get; set; }

        [JsonPropertyName("description")]
        public string Description { get; set; }

        [JsonPropertyName("additionalData")]
        public Dictionary<string, string>? AdditionalData { get; set; }
        public byte[] ImageData { get; set; } = [];
        public string ImageContentType { get; set; } = "image/webp";
    }
}