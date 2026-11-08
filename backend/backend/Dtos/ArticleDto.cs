using System.Text.Json.Serialization;

namespace backend.Dtos
{
    public class ArticleDto
    {

        [JsonPropertyName("title")]
        public string Title { get; set; }

        [JsonPropertyName("subtitle")]
        public string Subtitle { get; set; }

        [JsonPropertyName("text")]
        public string Text { get; set; }
    }
}
