import whisper


class WhisperProcessor:
    """
    A class for using the Whisper ASR (Automatic Speech Recognition) model to transcribe audio.

    Attributes:
        model (str): The Whisper ASR model.
        device (str): The device to run the model on (e.g., 'cuda' for GPU or 'cpu' for CPU).

    Methods:
        __init__(self, model, device):
            Initializes a WhisperProcessor instance with the provided Whisper model and device.

        transcribe_audio(self, audio_path):
            Transcribes the audio file at the given path using the Whisper ASR model.

    """

    def __init__(self, model, device):
        """
        Initializes a WhisperProcessor instance.

        Args:
            model (str): The Whisper ASR model name.
            device (str): The device to run the model on ('cuda' for GPU or 'cpu' for CPU).
        """
        self.model = whisper.load_model(model, device)

    def transcribe_audio(self, audio_path):
        """
        Transcribes the audio file at the given path using the Whisper ASR model.

        Args:
            audio_path (str): Path to the audio file for transcription.

        Returns:
            str: The transcribed text from the audio.
        """
        result = self.model.transcribe(audio_path, language='es')
        return result['text']
