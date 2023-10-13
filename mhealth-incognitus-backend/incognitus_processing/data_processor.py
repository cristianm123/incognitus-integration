import os
from incognitus_processing.whisper_processor import WhisperProcessor
import shutil
from incognitus_processing.data_handler import DataHandler


class DataProcessor(DataHandler):
    """
    A class for processing JSON data by transcribing audio and manipulating contents.

    Inherits from DataHandler class.

    Attributes:
        input_directory (str): The base directory for input data.
        output_directory (str): The directory where processed data will be saved.
        _transcriber (WhisperProcessor): An instance of WhisperProcessor for audio transcription.
        file_mapping (dict): A dictionary mapping local file paths to corresponding Minio paths.

    Methods:
        __init__(self, input_directory, output_directory):
            Initializes a DataProcessor instance with input and output directories.

        execute(self):
            Executes data processing operations on JSON files in the input directory.

        _get_filepaths(self, raw_filepath):
            Extracts Minio and local file paths from a raw file path.

        _process_evaluations(self, evaluations):
            Processes evaluation data by transcribing audio and performing modifications.
    """

    def __init__(self, input_directory, output_directory):
        """
        Initializes a DataProcessor instance.

        Args:
            input_directory (str): The base directory for input data.
            output_directory (str): The directory where processed data will be saved.
        """
        super().__init__(input_directory)
        self._transcriber = WhisperProcessor(model='tiny', device='cpu')
        self._output_directory = output_directory
        self.file_mapping = dict()

        if os.path.exists(self._output_directory):
            # If directory exists, delete it and its contents
            shutil.rmtree(self._output_directory)

        # Create a new directory
        os.makedirs(self._output_directory)

    def execute(self):
        """
        Executes data processing operations on JSON files in the input directory.
        """
        for file in os.listdir(self._input_directory):
            if file.endswith('.json'):
                patient = self._load_json_file('/'.join([self._input_directory, file]))
                self._remove_keys(patient, ['isExported'])
                print(f"processing patient with id: {patient['numberId']}")
                patient['evaluations'] = self._process_evaluations(patient['evaluations'])
                self._save_json_file(patient, '/'.join([self._output_directory, file]))
        self._clean_directory()

    def _get_filepaths(self, raw_filepath):
        """
        Extracts Minio and local file paths from a raw file path.

        Args:
            raw_filepath (str): The raw file path.

        Returns:
            str: The local file path.
            str: The Minio file path.
        """
        filename = raw_filepath.split('/')[-1]
        patient_id = filename.split('.')[0].split('_')[0]
        minio_path = f"{patient_id}/{filename}"
        local_path = f"{self._input_directory}/{filename}"
        self.file_mapping['/'.join(local_path.split('/')[2:])] = minio_path
        return local_path, minio_path

    def _process_evaluations(self, evaluations):
        """
        Processes evaluation data by transcribing audio and performing modifications.

        Args:
            evaluations (dict): The evaluation data.

        Returns:
            dict: The processed evaluation data.
        """
        keys = ['className', 'evaluationName']
        if 'MoCA' in evaluations:
            print("processing MoCA")
            moca = evaluations['MoCA']['questions']
            moca_questions = list(map(lambda x: x['className'], moca))
            questions_to_process = (
                'CubeQuestion', 'ClockQuestion', 'RepetitionQuestion', 'SubtractQuestion', 'CAQuestion')
            cube_index, \
            clock_index, \
            repetition_index, \
            subtraction_index, \
            fluency_index \
                = tuple(map(lambda x: moca_questions.index(x), questions_to_process))
            for i in range(len(moca)):
                moca[i] = self._remove_keys(moca[i], keys)
            try:
                # Cube
                if not moca[cube_index]['answered']:
                    raise Exception('Cube question not answered')
                _, minio_image_path = self._get_filepaths(moca[cube_index]['cubePath'])
                moca[cube_index]['cubePath'] = minio_image_path
                if not moca[clock_index]['answered']:
                    raise Exception('Clock question not answered')
                _, minio_image_path = self._get_filepaths(moca[clock_index]['clockPath'])
                moca[clock_index]['clockPath'] = minio_image_path
                if not moca[repetition_index]['answered']:
                    raise Exception('Repetition question not answered')
                moca[repetition_index]['phrasesToRepeat'][0]['phraseToRepeat'] = \
                    moca[repetition_index]['phrasesToRepeat'][0][
                        'phraseToRepeat'].replace('\t\t\t', ', ')
                moca[repetition_index]['phrasesToRepeat'][1]['phraseToRepeat'] = \
                    moca[repetition_index]['phrasesToRepeat'][1][
                        'phraseToRepeat'].replace('\t\t\t', ', ')

                if not moca[subtraction_index]['answered']:
                    raise Exception('Subtraction question not answered')
                moca[subtraction_index]['timeResponseTotal'] = sum(moca[subtraction_index]['subtractionsTimes'])

                if not moca[fluency_index]['answered']:
                    raise Exception('Fluidez question not answered')
                local_recording_path, minio_recording_path = self._get_filepaths(moca[fluency_index]['recordingPath'])
                moca[fluency_index]['recordingPath'] = minio_recording_path
                moca[fluency_index]['transcription'] = self._transcriber.transcribe_audio(local_recording_path)
            except Exception as e:
                if 'not answered' not in e.args[0]:
                    raise e
                print(e.args[0])

            evaluations['MoCA']['questions'] = moca
        else:
            print("MoCA not presented")
        if 'Prueba Fluidez Verbal' in evaluations:
            print("processing Prueba Fluidez Verbal")
            fluency = evaluations['Prueba Fluidez Verbal']['questions']
            for i in range(len(fluency)):
                fluency[i] = self._remove_keys(fluency[i], keys)
                if len(fluency[i]['startLetter']) > 1:
                    fluency[i]['category'] = fluency[i]['startLetter']
                    del fluency[i]['startLetter']
                if not fluency[i]['answered']:
                    print(f'question for {fluency[i].get("startLetter") or fluency[i].get("category")} not answered')
                    continue
                local_recording_path, minio_recording_path = self._get_filepaths(fluency[i]['recordingPath'])
                fluency[i]['recordingPath'] = minio_recording_path
                fluency[i]['transcription'] = self._transcriber.transcribe_audio(local_recording_path)
            evaluations['Prueba Fluidez Verbal']['questions'] = fluency
        else:
            print("Prueba Fluidez Verbal not presented")

        if 'MDS UPDRS III' in evaluations:
            print("processing MDS UPDRS III")
            mds = evaluations['MDS UPDRS III']['questions']
            keys = ['className', 'evaluationName', 'questionType']
            for i in range(len(mds)):
                mds[i] = self._remove_keys(mds[i], keys)
            evaluations['MDS UPDRS III']['questions'] = mds
        else:
            print("MDS UPDRS III not presented")

        if 'PD_NMS' in evaluations:
            print("processing PD_NMS")
            nms = evaluations['PD_NMS']['questions']
            keys = ['className', 'evaluationName', 'questionType']
            for i in range(len(nms)):
                nms[i] = self._remove_keys(nms[i], keys)
            evaluations['PD_NMS']['questions'] = nms
        else:
            print("PD_NMS not presented")
        return evaluations


if __name__ == "__main__":
    os.chdir("../")
    data_processor = DataProcessor(
        "buckets/incognitus-raw-data/2023-08-24_12_8E264ABF-F4B2-4C61-93CB-9C516DD1E3A0", "output")
    data_processor.execute()
